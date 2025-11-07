import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/report-lost-cat/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/report-lost-cat/"!</div>
}
