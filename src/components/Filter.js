function Filter({ title, rating, onTitleChange, onRatingChange }) {
  return (
    <div className="filters" aria-label="Filter movies">
      <label className="search-field">
        <span className="visually-hidden">Filter by title</span>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="8.7" cy="8.7" r="5.7" />
          <path d="m13 13 4 4" />
        </svg>
        <input
          type="search"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
          placeholder="Find a title"
        />
      </label>
      <label className="rating-filter">
        <span className="visually-hidden">Minimum rating</span>
        <span className="filter-star" aria-hidden="true">★</span>
        <select value={rating} onChange={(event) => onRatingChange(Number(event.target.value))}>
          <option value="0">Any rating</option>
          <option value="7">7.0 and up</option>
          <option value="8">8.0 and up</option>
          <option value="9">9.0 and up</option>
        </select>
      </label>
    </div>
  );
}

export default Filter;
