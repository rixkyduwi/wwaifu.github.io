
const randomImage= document.querySelector(".random-image"),
	  randomWaifu = document.querySelector(".random-waifu"),
	  randomWaifuNsfw = document.querySelector(".random-waifu-nsfw"),
	  formSelect = document.querySelector(".form-select"),
	  formSelectNsfw = document.querySelector(".form-select-nsfw"),
	  nsfwToggle = document.querySelector("#nsfwToggle"),
	  imageWrapper = document.querySelector('.image-wrapper')
document.querySelector(".sfw").style.display = "flex"
document.querySelector(".nsfw").style.display = "none"

formSelect.addEventListener('change', generateWaifu)
formSelectNsfw.addEventListener('change', generateWaifu);
let checkboxNsfw = document.querySelector('input[type=checkbox]');    

nsfwToggle.addEventListener('change', ()=>{
	if (checkboxNsfw.checked) {
		document.querySelector(".nsfw").style.display = "flex"
		document.querySelector(".sfw").style.display = "none"
		generateWaifu()
	} else {
		document.querySelector(".sfw").style.display = "flex"
		document.querySelector(".nsfw").style.display = "none"
		generateWaifu()
	}
	
})

const loading = './load.svg'
randomImage.src = loading

randomWaifu.addEventListener("click",generateWaifu);
randomWaifuNsfw.addEventListener("click",generateWaifu)

function generateWaifu() {
	randomImage.src = loading
	if (document.querySelector(".sfw").style.display == "flex") {
		fetchWaifu()
	} else if (document.querySelector(".nsfw").style.display == "flex") {
		fetchWaifuNsfw()
	}


}

async function fetchWaifu() {
	let category = formSelect.value;

	await fetch(`https://api.waifu.pics/sfw/${category}`)
		.then(response => response.json())
		.then(quote =>  {
			randomImage.src = quote.url
	})
}

async function fetchWaifuNsfw() {
	let category = formSelectNsfw.value;
	await fetch(`https://api.waifu.pics/many/nsfw/${category}`,{
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json', // Tentukan tipe konten JSON jika mengirim data JSON
		  // 'Authorization': 'Bearer yourAccessToken', // Sertakan header otorisasi jika diperlukan
		},
		body: JSON.stringify({
			exlude: 'value1'
		  }), // Ubah objek data menjadi string JSON
	  })
		.then(response => response.json())
		.then(quote =>  {
			console.log(quote)
			// Buat elemen <img> untuk setiap URL gambar dan tambahkan ke dalam elemen kontainer
			quote.files.forEach((imageUrl, index) => {
			// Buat elemen <img>
			const images = document.querySelector(".images")
			const image = document.createElement('div');
			const imgElement = document.createElement('img');

			// Atur atribut src dengan URL gambar
			imgElement.src = imageUrl;
			
			// Tambahkan kelas "image" ke elemen <img>
  			imgElement.classList.add('random-image');
			imgElement.classList.add('img-fluid');

			// Atur atribut alt (opsional)
			imgElement.alt = `Image ${index + 1}`;

			// Tambahkan elemen <img> ke dalam elemen kontainer
			const br = document.createElement('br');
			images.appendChild(br);
			images.appendChild(image);
			image.appendChild(imgElement);
			});
	})
}


generateWaifu()