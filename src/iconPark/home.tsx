import { defineComponent } from 'vue'

function home(): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 18V42H39V18L24 6L9 18Z"
        fill="none"
        stroke={`var(--color-base)`}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M19 29V42H29V29H19Z"
        fill="none"
        stroke={`var(--color-base)`}
        stroke-width="4"
        stroke-linejoin="round"
      />
      <path d="M9 42H39" stroke={`var(--color-base)`} stroke-width="4" stroke-linecap="round" />
    </svg>
  )
}

export default defineComponent({
  render() {
    return home()
  }
})
