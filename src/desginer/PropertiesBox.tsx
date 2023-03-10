export const PropertiesBox = () => {
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className='flex flex-col'>
        <h1>Selected</h1>
        <p></p>
      </div>
      <div>
        <form>
          <label htmlFor='prop'>Prop</label>
          <input type='text' name='prop'></input>
        </form>
      </div>
      <div>
        <button>Delete</button>
      </div>
    </div>
  );
};
