import { defineComponent } from 'vue'

type PropsType = { size: string | number }

function left(props: PropsType): JSX.Element {
  return (
    <svg
      width={props.size}
      height={props.size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 12L31 24L19 36"
        stroke={`var(--color-base)`}
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default defineComponent({
  props: {
    size: {
      type: Number,
      String,
      default: () => 24
    }
  },
  render(props: PropsType) {
    return left(props)
  }
})
