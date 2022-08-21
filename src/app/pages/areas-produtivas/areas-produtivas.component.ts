import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-areas-produtivas',
  templateUrl: './areas-produtivas.component.html',
  styleUrls: ['./areas-produtivas.component.scss']
})
export class AreasProdutivasComponent implements OnInit {

  closeResult = '';

  public addAreasProdutivasForm : FormGroup;
  public metaCustoForm: FormGroup;
  public metaProdutividadeForm: FormGroup;

 
  constructor(private modalService: NgbModal) {

    this.addAreasProdutivasForm = new FormGroup({
      name: new FormControl(null,[Validators.required, Validators.email]),
      fkIdVariedade: new FormControl(null, [ Validators.required]),
      size: new FormControl(null, [ Validators.nullValidator]),
      quantity_lines: new FormControl(null, [ Validators.nullValidator]),
      quantity_plants: new FormControl(null, [ Validators.nullValidator]),
      porta_enxerto: new FormControl(null, [ Validators.nullValidator]),
      spacing: new FormControl(null, [ Validators.nullValidator]),
      planting_at: new FormControl(null, [ Validators.nullValidator]),
    })

    this.metaCustoForm = new FormGroup({
      safra_id: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required])
    })

    this.metaProdutividadeForm = new FormGroup({
      safra_id: new FormControl(null, [Validators.required]),
      value: new FormControl(null, [Validators.required])
    })




  }

  ngOnInit(): void {
  }

  
  
  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


}
