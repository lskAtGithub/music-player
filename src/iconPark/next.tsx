import { defineComponent } from 'vue'

function next(): JSX.Element {
  return (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 12L26 24L14 36"
        stroke={`var(--color-base)`}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M34 12V36"
        stroke={`var(--color-base)`}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default defineComponent({
  render() {
    return next()
  }
})
