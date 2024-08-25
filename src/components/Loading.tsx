import PacmanLoader from 'react-spinners/PacmanLoader'

export default function Loading() {
  return (
    <div className="min-h[20vh] flex h-[30vh] w-[100%] min-w-full items-center justify-center">
      <PacmanLoader color={'#FFF'} size={30} aria-label="Loading Spinner" />
    </div>
  )
}
