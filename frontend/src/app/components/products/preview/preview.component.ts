import { AfterViewInit, Component, Input } from '@angular/core';
import Product from '../../../models/product';
import { ModalController } from '@ionic/angular';
import { ProductService } from '../../../services/product.service';
import { UserService } from '../../../services/user.service';
import { MessageController } from '../../../controllers/message-controller.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss'],
})
export class PreviewComponent implements AfterViewInit {
  @Input() product: Product;
  slideIndex = 1;

  constructor(private modalController: ModalController,
              private productService: ProductService,
              private userService: UserService,
              private messageController: MessageController) {
  }

  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  currentSlide(n) {
    this.showSlides(this.slideIndex = n);
  }

  showSlides(n) {
    let i;
    const slides = document.getElementsByClassName('mySlides');
    const dots = document.getElementsByClassName('dot');
    if (n > slides.length) {this.slideIndex = 1; }
    if (n < 1) {this.slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
      (slides[i] as HTMLElement).style.display = 'none';
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(' active', '');
    }
    (slides[this.slideIndex - 1] as HTMLElement).style.display = 'block';
    dots[this.slideIndex - 1].className += ' active';
  }

  ngAfterViewInit(): void {
    this.showSlides(this.slideIndex);
  }

  async dismissModal() {
    await this.modalController.dismiss();
  }

  buyProduct() {
    this.productService.buyProduct(this.userService.getUser(), this.product).subscribe(async () => {
      await this.messageController.handleMessage('Das Produkt gehört dir!');
      await this.modalController.dismiss({
        buy: true
      });
    }, async error => {
      await this.messageController.handleError(error);
    });
  }
}
