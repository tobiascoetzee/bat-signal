import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { VillainService } from '../villain.service';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-villain-edit',
  templateUrl: './villain-edit.component.html',
  styleUrls: ['./villain-edit.component.css']
})
export class VillainEditComponent implements OnInit {
  id: number;
  editMode = false;
  villainForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private villainService: VillainService,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  private initForm() {
    let name = '';
    let realName = '';
    let characterType = '';
    let gender = '';
    let description = '';
    let imageUrl = '';
    const villainPowers = new FormArray([]);

    if (this.editMode) {
      const villainData = this.villainService.getVillainFromIndex(this.id);
      name = villainData.name;
      realName = villainData.realName;
      characterType = villainData.characterType;
      gender = villainData.gender;
      description = villainData.description;
      imageUrl = villainData.imageUrl;

      if (villainData['powers']) {
        for (const power of villainData.powers) {
          villainPowers.push(
            new FormGroup({
              power: new FormControl(power, Validators.required)
            })
          );
        }
      }
    }

    this.villainForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      realName: new FormControl(realName, Validators.required),
      characterType: new FormControl(characterType, Validators.required),
      gender: new FormControl(gender, Validators.required),
      description: new FormControl(description, Validators.required),
      imageUrl: new FormControl(imageUrl, Validators.required),
      powers: villainPowers
    });
  }

  getPowersControls() {
    return (<FormArray>this.villainForm.get('powers')).controls;
  }

  onAddPower() {
    (<FormArray>this.villainForm.get('powers')).push(
      new FormGroup({
        power: new FormControl(null, Validators.required)
      })
    );
  }

  onDeletePower(index: number) {
    (<FormArray>this.villainForm.get('powers')).removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      console.log('Update Villain');
    } else {
      console.log('Add Villain');
    }

    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
