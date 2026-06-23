import { useNoteActions } from '../store'

const VisibilityFilter = () => {
  const { setFilter } = useNoteActions()

  return (
    <div className="bg-slate-100 p-4 rounded-lg border border-slate-300 shadow-sm w-fit flex gap-2 accent-slate-500">
      <input
        type="radio"
        name="filter"
        id="filter-all"
        onChange={() => setFilter('all')}
        defaultChecked
      />
      <label htmlFor="filter-all">All</label>
      <input
        type="radio"
        name="filter"
        id="filter-important"
        onChange={() => setFilter('important')}
      />
      <label htmlFor="filter-important">Important</label>
      <input
        type="radio"
        name="filter"
        id="filter-notimportant"
        onChange={() => setFilter('nonimportant')}
      />
      <label htmlFor="filter-notimportant">Not important</label>
    </div>
  )
}

export default VisibilityFilter
