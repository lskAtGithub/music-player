import { defineComponent } from 'vue'

type PropsType = { color: string }

function play(props: PropsType): JSX.Element {
  return (
    <svg width="36" height="36" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 24V11.8756L25.5 17.9378L36 24L25.5 30.0622L15 36.1244V24Z"
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
    return play(props)
  }
})
