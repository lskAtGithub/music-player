import { defineComponent } from 'vue'

function system():JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="19"
        y="32"
        width="10"
        height="9"
        stroke={`var(--color-base)`}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect x="5" y="8" width="38" height="24" rx="2" fill="none" stroke={`var(--color-base)`} stroke-width="4" />
      <path
        d="M22 27H26"
        stroke={`var(--color-base)`}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M14 41L34 41"
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
    return system()
  }
})
