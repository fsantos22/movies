import PacmanLoader from 'react-spinners/PacmanLoader'

export default function Loading() {
  return (
    <section className="min-h[20vh] flex h-[30vh] w-full min-w-[70vw] items-center justify-center">
      <PacmanLoader color={'#FFF'} size={30} aria-label="Loading Spinner" />
    </section>
  )
}
