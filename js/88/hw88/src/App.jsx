import { useState } from 'react';

function App() {
  const [page, setPage] = useState({
    color: 'rgba(0, 0, 0, 1)',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Arial',
    fontSize: '16px',
  });

  const [notepad, setNotepad] = useState({
    color: 'rgba(0, 0, 0, 1)',
    bgcolor: 'rgba(255, 255, 255, 1)',
    font: 'Arial',
    fontSize: '16px',
  });

  const [update, setUpdate] = useState({
    fontColor: 'rgba(0, 0, 0, 1)',
    bgColor: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Arial',
    fontSize: '16px',
    notepadColor: 'rgba(0, 0, 0, 1)',
    notepadBg: 'rgba(255, 255, 255, 1)',
    notepadFont: 'Arial',
    notepadFontSize: '16px',
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setUpdate((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div style={{ ...page, minHeight: '100vh', padding: '1rem' }}>
      <form>
        <h3>Page Styles</h3>

        <label>
          Background color:
          <input
            type='color'
            name='bgColor'
            value={update.bgColor}
            onChange={handleChange}
          />
        </label>

        <label>
          Text color:
          <input
            type='color'
            name='fontColor'
            value={update.fontColor}
            onChange={handleChange}
          />
        </label>



        <label>
          Font:
          <select
            name='fontFamily'
            value={update.fontFamily}
            onChange={handleChange}
          >
            <option value='Arial' style={{ fontFamily: 'Arial' }}>Arial</option>
            <option value='Fantasy' style={{ fontFamily: 'Fantasy' }}>Fantasy</option>
            <option value='Georgia' style={{ fontFamily: 'Georgia' }}>Georgia</option>
            <option value='Helvetica' style={{ fontFamily: 'Helvetica' }}>Helvetica</option>
            <option value='Verdana' style={{ fontFamily: 'Verdana' }}>Verdana</option>
            <option value='Cursive' style={{ fontFamily: 'Cursive' }}>Cursive</option>
          </select>
        </label>

        <label>
          Font size:
          <input
            type='number'
            name='fontSize'
            min='10'
            max='100'
            value={parseInt(update.fontSize)}
            onChange={(e) =>
              handleChange({
                target: { name: 'fontSize', value: e.target.value + 'px' },
              })
            }
          />
        </label>

        <h3>Notepad Styles</h3>

        <label>
          Background color:
          <input
            type='color'
            name='notepadBg'
            value={update.notepadBg}
            onChange={handleChange}
          />
        </label>
        <label>
          Text color:
          <input
            type='color'
            name='notepadColor'
            value={update.notepadColor}
            onChange={handleChange}
          />
        </label>



        <label>
          Font:
          <select
            name='notepadFont'
            value={update.notepadFont}
            onChange={handleChange}
          >
            <option value='Arial' style={{ fontFamily: 'Arial' }}>Arial</option>
            <option value='Fantasy' style={{ fontFamily: 'Fantasy' }}>Fantasy</option>
            <option value='Georgia' style={{ fontFamily: 'Georgia' }}>Georgia</option>
            <option value='Helvetica' style={{ fontFamily: 'Helvetica' }}>Helvetica</option>
            <option value='Verdana' style={{ fontFamily: 'Verdana' }}>Verdana</option>
            <option value='Cursive' style={{ fontFamily: 'Cursive' }}>Cursive</option>
          </select>
        </label>

        <label>
          Font size:
          <input
            type='number'
            name='notepadFontSize'
            min='10'
            max='100'
            value={parseInt(update.notepadFontSize)}
            onChange={(e) =>
              handleChange({
                target: {
                  name: 'notepadFontSize',
                  value: e.target.value + 'px',
                },
              })
            }
          />
        </label>

        <br />

        <button
          onClick={(e) => {
            e.preventDefault();
            setPage({
              color: update.fontColor,
              backgroundColor: update.bgColor,
              fontFamily: update.fontFamily,
              fontSize: update.fontSize,
            });
            setNotepad({
              color: update.notepadColor,
              bgcolor: update.notepadBg,
              font: update.notepadFont,
              fontSize: update.notepadFontSize,
            });
          }}
        >
          Apply
        </button>
      </form>

      <hr />

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur
        deserunt illo, quaerat quo dicta nemo quae ratione repellendus alias
        molestias optio.
      </p>

      <textarea
        style={{
          width: '100%',
          height: '300px',
          backgroundColor: notepad.bgcolor,
          color: notepad.color,
          fontFamily: notepad.font,
          fontSize: notepad.fontSize,
          padding: '10px',
          borderRadius: '5px',
          boxSizing: 'border-box',
        }}
        placeholder='Start typing your notes here...'
      ></textarea>
    </div>
  );
}

export default App;