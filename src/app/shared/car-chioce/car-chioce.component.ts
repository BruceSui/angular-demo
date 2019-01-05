import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarChoiceService } from './car-choice.service';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'jhi-car-chioce',
    templateUrl: './car-chioce.component.html',
    styleUrls: ['./car-chioce.component.scss']
})
export class CarChioceComponent implements OnInit, OnDestroy {
    carBrands = new Array();
    carTrees = new Array();
    carTree = { level: 0 };
    carBrandsList = new Array();

    type: number;
    isPopup = false;
    subscription: Subscription;
    constructor(
        private service: CarChoiceService,
        private router: Router,
    ) {
        this.subscription = this.service.$request.subscribe((data: any) => {
            console.log(data);
            this.type = data;
            this.isPopup = true;
            document.body.style.overflow = 'hidden';
        });
    }

    ngOnInit() {
        this.router.events.subscribe(event => {
            // console.log(event);
            if (event instanceof NavigationEnd) {
                // this.router;
                console.log(this.router.url);
            }
          });
        this.getCarBrands();
    }
    ngOnDestroy() {
        // prevent memory leak when component destroyed
        console.log('ngOnDestroy');
        this.subscription.unsubscribe();
    }

    getCarBrands(): void {
        this.service.searchBrand().subscribe((data: any) => {
            this.carBrands.push(...data);
            this.carBrands.forEach(carBrand => {
                let cateId = carBrand.headChar.substring(0, 1).toUpperCase();
                let cateTree = this.carBrandsList.find(element => element.cateId === cateId);
                if (cateTree) {
                    cateTree.carBrands.push(carBrand);
                } else {
                    this.carBrandsList.push({ cateId: cateId, carBrands: [carBrand] });
                }
            });
            this.carBrandsList.sort((a, b) => {
                return a.cateId.charCodeAt() - b.cateId.charCodeAt();
            });
            console.log(this.carBrandsList);
        });
    }
    searchCarTree(carTree) {
        if (this.type === 1) {
            this.doResponse(carTree);
        } else if (this.type === 2) {
            this.carTrees.splice(0, this.carTrees.length);
            this.service.searchCarTree(carTree).subscribe((data: any) => {
                this.carTrees.push(...data);
            });
        }
    }

    goBack() {
        document.body.style.overflow = '';
        this.isPopup = false;
    }
    doResponse(carTree) {
        this.goBack();
        this.service.doResponse(carTree);
    }
}
