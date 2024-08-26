import PacmanLoader from 'react-spinners/PacmanLoader'

export default function Loading() {
  return (
    <section className="min-h[20vh] flex h-[30vh] w-[100%] min-w-[70vw] min-w-full items-center justify-center">
      <PacmanLoader color={'#FFF'} size={30} aria-label="Loading Spinner" />
    </section>
  )
}
