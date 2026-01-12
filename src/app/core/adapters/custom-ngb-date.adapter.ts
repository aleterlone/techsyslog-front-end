import { Injectable } from "@angular/core";
import { NgbDateAdapter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class CustomNgbDateAdapter extends NgbDateAdapter<string> {
	readonly DELIMITER = "-";

	override fromModel(value: NgbDateStruct | string | null): NgbDateStruct | null {
		if (value != null) {
			switch (typeof value) {
				case "string":
					if (value) {
						const date = value.split(this.DELIMITER);

						return {
							day: parseInt(date[0], 10),
							month: parseInt(date[1], 10),
							year: parseInt(date[2], 10)
						};
					}

					break;
				default:
					return {
						day: value.day,
						month: value.month,
						year: value.year
					};
			}
		}

		return null;
	}

	override toModel(date: NgbDateStruct | null): string | null {
		return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
	}
}
