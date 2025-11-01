import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_landing/contact-us')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_landing/contact-us"!</div>
}
