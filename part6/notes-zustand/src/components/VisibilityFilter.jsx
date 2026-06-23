import { useNoteActions } from '../store'

const VisibilityFilter = () => {
  const { setFilter } = useNoteActions()

  return (
    <div className="bg-slate-100 p-4 rounded-lg border border-slate-300 shadow-sm w-fit flex gap-2 accent-slate-500">
      <input
        type="radio"
        name="filter"
        onChange={() => setFilter('all')}
        defaultChecked
      />
      All
      <input
        type="radio"
        name="filter"
        onChange={() => setFilter('important')}
      />
      Important
      <input
        type="radio"
        name="filter"
        onChange={() => setFilter('nonimportant')}
      />
      Not important
    </div>
  )
}

export default VisibilityFilter
