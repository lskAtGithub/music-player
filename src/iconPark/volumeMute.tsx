import { defineComponent } from 'vue'

function volumeMute() {
  return (
    <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect opacity="0.01" x="30" y="18" width="13" height="13" fill="#333" />
      <mask
        id="icon-24f3ee04e6a0e536"
        maskUnits="userSpaceOnUse"
        x="30"
        y="18"
        width="13"
        height="13"
        style="mask-type: alpha"
      >
        <rect x="30" y="18" width="13" height="13" fill="#333" />
      </mask>
      <g mask="url(#icon-24f3ee04e6a0e536)">
        <path
          d="M40.7348 20.2858L32.2495 28.7711"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="square"
          stroke-linejoin="round"
        />
        <path
          d="M32.2496 20.2858L40.7349 28.7711"
          stroke="currentColor"
          stroke-width="4"
          stroke-linecap="square"
          stroke-linejoin="round"
        />
      </g>
      <path
        d="M24 6V42C17 42 11.7985 32.8391 11.7985 32.8391H6C4.89543 32.8391 4 31.9437 4 30.8391V17.0108C4 15.9062 4.89543 15.0108 6 15.0108H11.7985C11.7985 15.0108 17 6 24 6Z"
        fill="none"
        stroke="currentColor"
        stroke-width="4"
        stroke-linejoin="round"
      />
    </svg>
  )
}

export default defineComponent({
  render() {
    return volumeMute()
  }
})
