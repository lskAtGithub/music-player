import { defineComponent } from 'vue'

function setting() {
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 4L18 10H10V18L4 24L10 30V38H18L24 44L30 38H38V30L44 24L38 18V10H30L24 4Z"
        fill="none"
        stroke={`var(--color-base)`}
        stroke-width="4"
        stroke-linejoin="round"
      />
      <path
        d="M24 30C27.3137 30 30 27.3137 30 24C30 20.6863 27.3137 18 24 18C20.6863 18 18 20.6863 18 24C18 27.3137 20.6863 30 24 30Z"
        fill="none"
        stroke={`var(--color-base)`}
        stroke-width="4"
        stroke-linejoin="round"
      />
    </svg>
  )
}
export default defineComponent({
  render() {
    return setting()
  }
})
