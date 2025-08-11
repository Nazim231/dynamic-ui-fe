import { get, post } from '@/lib/api-handler';
import type { Page } from '@/types/page';
import type { ColumnDef } from '@tanstack/react-table';
import { useState, useCallback, useEffect } from 'react';
import { toast } from 'sonner';

export function usePageBuilder() {
  const initialFormState: Page = {
    name: '',
    slug: '',
  };

  const [formState, setFormState] = useState<Page>(initialFormState);
  const [existingPages, setExistingPages] = useState<Page[]>([]);
  const [slugManipulated, setSlugManipulated] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // fetching existing pages.
  useEffect(() => {
    const getPages = async () => {
      const response = await get('/page');
      setExistingPages(response.success ? (response.data ?? []) : []);
    };
    getPages();
  }, []);

  // converting the page name into slug automatically
  // until the user manually manipulated the slug.
  useEffect(() => {
    function createSlug(str: string) {
      return str
        .toLowerCase()
        .split(' ')
        .filter(Boolean)
        .map((w) => w.toLowerCase())
        .join('-');
    }
    if (!slugManipulated) setFormState((prev) => ({ ...prev, slug: createSlug(formState.name) }));
  }, [formState.name]);

  // Table Columns
  const pageTableColumns: ColumnDef<Page>[] = [
    {
      header: 'Name',
      accessorKey: 'name',
    },
    {
      header: 'Slug',
      accessorKey: 'slug',
    },
  ];

  // setting the inputs in the state by the input name.
  const formChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [setFormState],
  );

  // sending the data to the API.
  const submitHandler = useCallback(async () => {
    setValidationErrors({});
    const response = await post('/page', formState);
    if (!response.success) {
      toast.error(response.message);
      if (response.validationErrors) setValidationErrors(response.validationErrors);
      return;
    }
    toast.success('Page created successfully');
    setFormState(initialFormState);
  }, [formState]);

  return {
    states: { formState, existingPages, pageTableColumns, slugManipulated, validationErrors },
    stateUpdaters: { setFormState, setSlugManipulated, setValidationErrors },
    handlers: { submitHandler, formChangeHandler },
  };
}
