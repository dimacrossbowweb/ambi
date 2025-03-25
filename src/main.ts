import './style.css';
import { Ambilight } from './entities/ambilight';
import { Ambilighter } from './entities/ambilighter';
import { AmbiBox } from './components/ambi-box';

function onUpload () {

  const url = document.getElementById( 'url' );

  const img = document.getElementById( 'cat' );

  img.src = url.value;

}


// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100vh;">
    
//     <div class="wrapper">

//       <div class="wrap">

//         <div id="top" class="top"></div>
//         <div id="right" class="right"></div>
//         <div id="bottom" class="bottom"></div>
//         <div id="left" class="left"></div>

//       </div>

//     </div>

//   </div>
// `;




// document.addEventListener( 'DOMContentLoaded', () => {

//   const ambi: Ambilighter | null = Ambilight.produce( document.getElementById( 'video' ), {} );

//   ambi.onLoad = ( data: any ) => {

// 	console.log( data );

//     const top = document.getElementById( 'top' );
//     const right = document.getElementById( 'right' );
//     const bottom = document.getElementById( 'bottom' );
//     const left = document.getElementById( 'left' );

//     top.style.backgroundColor = `rgb( ${ data.top.color.r }, ${ data.top.color.g }, ${ data.top.color.b } )`;
//     top.style.boxShadow = `0 -40px 30px rgb( ${ data.top.color.r }, ${ data.top.color.g }, ${ data.top.color.b } )`;

//     right.style.backgroundColor = `rgb( ${ data.right.color.r }, ${ data.right.color.g }, ${ data.right.color.b } )`;
//     right.style.boxShadow = `40px 0 30px rgb( ${ data.right.color.r }, ${ data.right.color.g }, ${ data.right.color.b } )`;

//     bottom.style.backgroundColor = `rgb( ${ data.bottom.color.r }, ${ data.bottom.color.g }, ${ data.bottom.color.b } )`;
//     bottom.style.boxShadow = `0 40px 30px rgb( ${ data.bottom.color.r }, ${ data.bottom.color.g }, ${ data.bottom.color.b } )`;

//     left.style.backgroundColor = `rgb( ${ data.left.color.r }, ${ data.left.color.g }, ${ data.left.color.b } )`;
//     left.style.boxShadow = `-40px 0 30px rgb( ${ data.left.color.r }, ${ data.left.g }, ${ data.left.color.b } )`;

//   };

// } );
