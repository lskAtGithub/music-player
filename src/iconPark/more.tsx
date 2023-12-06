import { defineComponent } from 'vue'

function more() {
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="24" r="3" fill="currentColor" />
      <circle cx="24" cy="24" r="3" fill="currentColor" />
      <circle cx="36" cy="24" r="3" fill="currentColor" />
    </svg>
  )
}

export default defineComponent({
  render() {
    return more()
  }
})
