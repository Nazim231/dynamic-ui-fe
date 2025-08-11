import { SectionWithTitle } from '@/components/SectionWithTitle';
import { DataTable } from '@/components/DataTable';
import { Button } from '@shadcn/ui/button';
import { Input } from '@shadcn/ui/input';
import type { Page } from '@/types/page';
import { usePageBuilder } from '@/hooks/page-creator';

export function Page() {
  const { states, stateUpdaters, handlers } = usePageBuilder();

  return (
    <section className="flex flex-col gap-2">
      <SectionWithTitle
        title="Add New"
        classNames={{ content: 'flex flex-wrap gap-4 items-start' }}
      >
        <div className="flex-1">
          <Input
            placeholder="Name"
            name="name"
            onChange={handlers.formChangeHandler}
            value={states.formState.name}
            aria-invalid={Boolean(states.validationErrors.name)}
          />
          <span className="text-destructive text-xs">{states.validationErrors.name}</span>
        </div>
        <div className="flex-1">
          <Input
            placeholder="Slug"
            name="slug"
            onChange={handlers.formChangeHandler}
            onKeyDown={() => stateUpdaters.setSlugManipulated(true)}
            value={states.formState.slug}
            aria-invalid={Boolean(states.validationErrors.slug)}
          />
          <span className="text-destructive text-xs">{states.validationErrors.slug}</span>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handlers.submitHandler}>Create</Button>
          <Button variant={'ghost'}>Reset</Button>
        </div>
      </SectionWithTitle>
      <SectionWithTitle title="All Pages" classNames={{ content: 'p-0' }}>
        <DataTable columns={states.pageTableColumns} data={states.existingPages} />
      </SectionWithTitle>
    </section>
  );
}
