class AddAndMoveImg {

    constructor() {

        this.fileInput = document.querySelector('.imageInput')
        this.selectButton = document.querySelector('.selectButton')
        this.imageContainer = document.querySelector('.countainer')

        this.selectButton.addEventListener('click', () => this.selectImage())
        this.fileInput.addEventListener('change', () => this.displayImage())
        
        this.selectedImage = null
    }

    selectImage() {

        this.fileInput.click()
    }

    displayImage() {
        this.title = document.querySelector('.title')

        this.distanceToLeft = (window.innerWidth - 750) / 2
        this.totalDistance = this.distanceToLeft + 562
        let image

        if (this.fileInput.files[0]) {

            
            if (!this.fileInput.files[0].type.startsWith('image/')) {
                alert('Please select an image file.')
                return
            }

            this.imgIds++
            let reader = new FileReader()
          
            reader.onload = (e) => {

                image = document.createElement('img')
                image.src = e.target.result
                image.style.width = '100px'
                image.style.height = '100px'
                image.style.position = 'absolute'
                image.style. cursor  = 'pointer'
                image.style.top = `${this.getRandomPosition(this.title.clientHeight, this.title.clientHeight + 300)}px`
                image.style.left = `${this.getRandomPosition(this.distanceToLeft, this.totalDistance)}px`
                
                this.imageContainer.appendChild(image)
                image.addEventListener('click', () => this.moveImage(image))
            }

            reader.readAsDataURL(this.fileInput.files[0])
        }

      
    }
    moveImage(image) {

        if (this.selectedImage) {
          this.selectedImage.classList.remove('selected')
          document.removeEventListener('keydown', this.handleKeyboardNavigation)
          
        }

        this.selectedImage = image
        this.selectedImage.classList.add('selected')
        document.addEventListener('keydown', this.handleKeyboardNavigation.bind(this))
      }

      handleKeyboardNavigation = (e) => {
        if (!this.selectedImage) return

        const step = 10
        let newTop = parseInt(this.selectedImage.style.top) || 0
        let newLeft = parseInt(this.selectedImage.style.left) || 0

        switch (e.key) {
          case 'ArrowUp':
            newTop =  Math.max(newTop - step, this.title.clientHeight)
            break
          case 'ArrowDown':
            newTop =  Math.min(newTop + step, this.imageContainer.clientHeight  + this.title.clientHeight - this.selectedImage.clientHeight)
            break
            break
          case 'ArrowLeft':
            newLeft = Math.max(newLeft - step, this.distanceToLeft)
            break
          case 'ArrowRight':
            newLeft =  Math.min(newLeft + step,  this.totalDistance)
            break
          default:
            return
        }

        this.selectedImage.style.top = `${newTop}px`
        this.selectedImage.style.left = `${newLeft}px`
      }


    getRandomPosition(min, max) {

        return Math.floor(Math.random() * (max - min + 1)) + min
    }
}

let AddAndMove = new AddAndMoveImg()



