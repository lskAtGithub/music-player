import { defineComponent } from 'vue'

function full(): JSX.Element {
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M33 6H42V15"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
      <path
        d="M42 33V42H33"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
      <path
        d="M15 42H6V33"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
      <path
        d="M6 15V6H15"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="square"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default defineComponent({
  render() {
    return full()
  }
})
