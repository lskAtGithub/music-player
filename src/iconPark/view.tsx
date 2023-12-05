import { defineComponent } from 'vue'

type PropsType = { color: string }

function view(props: PropsType) {
  return (
    <svg width="24" height="24" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M24 36C35.0457 36 44 24 44 24C44 24 35.0457 12 24 12C12.9543 12 4 24 4 24C4 24 12.9543 36 24 36Z"
        fill="none"
        stroke={props.color}
        stroke-width="4"
        stroke-linejoin="round"
      />
      <path
        d="M24 29C26.7614 29 29 26.7614 29 24C29 21.2386 26.7614 19 24 19C21.2386 19 19 21.2386 19 24C19 26.7614 21.2386 29 24 29Z"
        fill="none"
        stroke={props.color}
        stroke-width="4"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default defineComponent({
  props: {
    color: {
      type: String,
      default: () => 'currentColor'
    }
  },
  render(props: PropsType) {
    return view(props)
  }
})
