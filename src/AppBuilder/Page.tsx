import { useCallback, useEffect, useState } from 'react';
import { SectionWithTitle } from '@/components/SectionWithTitle';
import { post } from '@/lib/api-handler';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import { toast } from 'sonner';
import type { Page } from '@/types/page';

export function Page() {
  const initialFormState: Page = {
    name: '',
    slug: '',
  };

  const [formState, setFormState] = useState<Page>(initialFormState);
  const [slugManipulated, setSlugManipulated] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const formChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    [setFormState],
  );

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

  return (
    <section>
      <SectionWithTitle title="Add New" classNames={{ content: 'flex flex-wrap gap-4 items-start' }}>
        <div className="flex-1">
          <Input
            placeholder="Name"
            name="name"
            onChange={formChangeHandler}
            value={formState.name}
            aria-invalid={Boolean(validationErrors.name)}
          />
          <span className="text-destructive text-xs">{validationErrors.name}</span>
        </div>
        <div className="flex-1">
          <Input
            placeholder="Slug"
            name="slug"
            onChange={formChangeHandler}
            onKeyDown={() => setSlugManipulated(true)}
            value={formState.slug}
            aria-invalid={Boolean(validationErrors.slug)}
          />
          <span className="text-destructive text-xs">{validationErrors.slug}</span>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={submitHandler}>Create</Button>
          <Button variant={'ghost'}>Reset</Button>
        </div>
      </SectionWithTitle>
    </section>
  );
}
