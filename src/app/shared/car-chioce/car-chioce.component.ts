import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarChoiceService } from './car-choice.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'jhi-car-chioce',
    templateUrl: './car-chioce.component.html',
    styleUrls: ['./car-chioce.component.scss']
})
export class CarChioceComponent implements OnInit, OnDestroy {
    carBrands = new Array();
    carTrees = new Array();
    carBrandsList = new Array();

    type: number;
    isPopup = false;
    subscription: Subscription;

    constructor(
        private service: CarChoiceService,
    ) {
        this.subscription = this.service.$request.subscribe((data: any) => {
            console.log(data);
            this.type = data;
            this.isPopup = true;
            this.getCarBrands();
            document.body.style.overflow = 'hidden';
        });
    }

    ngOnInit() {
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
        console.log();
        // let pagePopup = <HTMLDivElement>document.querySelector('.pagePopup');
        // pagePopup.style.overflowY = 'hidden';
        if (carTree.level === 4) {
            this.doResponse(carTree);
            return;
        }
        if (this.type === 1) {
            this.doResponse(carTree);
        } else if (this.type === 2) {
            this.carTrees.splice(0, this.carTrees.length);
            this.service.searchCarTree(carTree).subscribe((data: any) => {
                console.log(data);
                this.carTrees.push(...data);
            });
        }
    }
    doResponse(carTree) {
        this.goBack(2);
        this.service.doResponse(carTree);
    }
    goBack(type: number) {
        // let pagePopup = <HTMLDivElement>document.querySelector('.pagePopup');
        // pagePopup.style.overflowY = 'scroll';
        this.carTrees.splice(0, this.carTrees.length);
        if (type === 1)  {
            return;
        } else if (type ===2) {
            document.body.style.overflow = '';
            this.isPopup = false;
        }
    }
}
