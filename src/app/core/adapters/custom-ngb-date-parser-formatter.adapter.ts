import { Injectable } from "@angular/core";
import { NgbDateParserFormatter, NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

@Injectable()
export class CustomNgbDateParserFormatterAdapter extends NgbDateParserFormatter {
	readonly DELIMITER = "/";

	override parse(value: string): NgbDateStruct | null {
		if (value != null) {
			const date = value.split(this.DELIMITER);

			return {
				day: parseInt(date[0], 10),
				month: parseInt(date[1], 10),
				year: parseInt(date[2], 10)
			};
		}

		return null;
	}

	override format(date: NgbDateStruct | null): string {
		return date ? date.day.toString().padStart(2, "0") +
						this.DELIMITER + date.month.toString().padStart(2, "0") +
						this.DELIMITER + date.year : "";
	}
}
