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
        d="M31 36L19 24L31 12"
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
