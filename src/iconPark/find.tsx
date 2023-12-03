import { defineComponent } from 'vue'

function find() {
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 7H44" stroke={`var(--color-base)`} stroke-width="4" stroke-linecap="round" />
      <path d="M4 23H15" stroke={`var(--color-base)`} stroke-width="4" stroke-linecap="round" />
      <path d="M4 39H15" stroke={`var(--color-base)`} stroke-width="4" stroke-linecap="round" />
      <path
        d="M31.5 34C36.1944 34 40 30.1944 40 25.5C40 20.8056 36.1944 17 31.5 17C26.8056 17 23 20.8056 23 25.5C23 30.1944 26.8056 34 31.5 34Z"
        fill="none"
        stroke={`var(--color-base)`}
        stroke-width="4"
      />
      <path
        d="M37 32L44 39.0505"
        stroke={`var(--color-base)`}
        stroke-width="4"
        stroke-linecap="round"
      />
    </svg>
  )
}

export default defineComponent({
  render() {
    return find()
  }
})
