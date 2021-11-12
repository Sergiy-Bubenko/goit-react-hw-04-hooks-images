export default function Button({ onLoadMore }) {
  return (
    <button className="Button" type="button" onClick={onLoadMore}>
      Load more
    </button>
  )
}
