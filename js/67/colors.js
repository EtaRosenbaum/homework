(function () {
  'use strict';


  const color = document.querySelector('#color');
  const bgcolor = document.querySelector('#bgcolor');

  const colorTable = document.querySelector('#colorTable');
  const now = new Date();
  console.log(now.toLocaleString());



  color.addEventListener('change', () => {
    document.body.style.color = color.value;


    addRow();

  });

  bgcolor.addEventListener('click', () => {
    document.body.style.backgroundColor = bgcolor.value;

    addRow();

  });


  function addRow() {
    const row = colorTable.insertRow();

    row.innerHTML = `<td> ${color.value}</td>
    <td>${bgcolor.value} </td> <td>${now.toLocaleString()} </td>`;
    row.onclick = function () {
      changeColor(this);
    };
  };


  function changeColor(row) {
    const rowColor = row.childNodes[0].innerHTML;
    const rowbgColor = row.childNodes[2].innerHTML;
    console.log(rowColor, rowbgColor);

    document.body.style.color = rowColor;
    document.body.style.backgroundColor = rowbgColor;

  };



  // colorTable.addEventListener('click', e => {
  //   console.log('table was clicked');
  //   console.log(e.target);


  //   document.body.style.color = e.target.id;
  // });

}());
