import { Component, OnInit } from '@angular/core';
import { Emr } from '../emr';
import { EmrService } from '../emr.service';
import { EmrDetailsComponent } from '../emr-details/emr-details.component';

@Component({
  selector: 'app-emr-list',
  templateUrl: './emr-list.component.html',
  styleUrls: ['./emr-list.component.css'],
  providers: [EmrService]
})
export class EmrListComponent implements OnInit {

  emrecords: Emr[]
  selectedEmr: Emr


  constructor(private emrService: EmrService) { }

  ngOnInit() {
    this.emrService
    .getEmrecords()
    .then((emrecords: Emr[]) => {
      this.emrecords = emrecords.map((emr) => {
        if (!emr.phone) {
          emr.phone = {
            mobile: '',
            work: ''
          }
        }
        return emr;
      });
    });
  }

  private getIndexOfEmr = (emrId: String) => {
    return this.emrecords.findIndex((emr) => {
      return emr._id === emrId;
    });
  }

  selectEmr(emr: Emr) {
    this.selectedEmr = emr
  }

  createNewEmr() {
    var emr: Emr = {
      name: '',
      address: '',
      phone: {
        work: '',
        mobile: ''
      },
      medications: '',
      doctor: ''
    };

    this.selectEmr(emr);
  }

  deleteEmr = (emrId: String) => {
    var idx = this.getIndexOfEmr(emrId);
    if (idx !== -1) {
      this.emrecords.splice(idx, 1);
      this.selectEmr(null);
    }
    return this.emrecords;
  }

  addEmr = (emr: Emr) => {
    this.emrecords.push(emr);
    this.selectEmr(emr);
    return this.emrecords;
  }

  updateEmr = (emr: Emr) => {
    var idx = this.getIndexOfEmr(emr._id);
    if (idx !== -1) {
      this.emrecords[idx] = emr;
      this.selectEmr(emr);
    }
    return this.emrecords;
  }

}
