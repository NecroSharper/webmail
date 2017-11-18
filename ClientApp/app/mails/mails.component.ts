import { Component, OnInit } from '@angular/core';
import { MailsService } from "./mails.service";
import { Mail } from "../core/models/mail";

export enum SortOrder {
  asc,
  desc
}

@Component({
  selector: 'appc-mails-component',
  styleUrls: ['./mails.component.scss'],
  templateUrl: './mails.component.html'
})
export class MailsComponent implements OnInit {
    public mailsFromServer: Array<Mail> = [];
    public mailsAfterSearch: Array<Mail> = [];
    public mailsOnPage: Array<Mail> = [];
    public maxMailsOnPage = 5;
    public page = 1;
    public searched: String;
    public sortOrderTitle: SortOrder = SortOrder.asc;
    public currentSortOrderTitle: SortOrder = this.sortOrderTitle;
    public sortOrderDate: SortOrder = SortOrder.desc;
    public currentSortOrderDate: SortOrder = this.sortOrderDate;
    public loadingMails = false;
    constructor(private mailsService: MailsService) {

      this.mailsService.listen().subscribe((m:any) => {
        this.getMailsFromMailbox(m);
      })
    }

    public ngOnInit() {
        this.loadingMails = true;
        this.mailsService.getMails().subscribe(mails => {
            this.loadingMails = false;
            // sprawdzenie czy pobrane maile nie sa puste, zeby uniknac bledow w widoku
            if (mails) {
              this.mailsFromServer = mails;
            } else {
              this.mailsFromServer = [];
            }
            this.searched = "";
            this.searchInMails();
            //sortowanie po dacie
            this.changeSortOrderDate();
        });
    }

    public changeSortOrderTitle() {
        let sort = this.currentSortOrderTitle = this.sortOrderTitle;

        this.mailsAfterSearch.sort(function (mail1, mail2) {
            switch (sort) {
                case SortOrder.asc: default: {
                    if (mail1.title.toLowerCase() < mail2.title.toLowerCase()) {
                        return -1;
                    } else if (mail1.title.toLowerCase() > mail2.title.toLowerCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
                case SortOrder.desc: {
                    if (mail1.title.toLowerCase() > mail2.title.toLowerCase()) {
                        return -1;
                    } else if (mail1.title.toLowerCase() < mail2.title.toLowerCase()) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }

        });
        this.page = 1;
        this.getPartOfMails();

        if(this.sortOrderTitle as SortOrder == SortOrder.asc as SortOrder) {
          this.sortOrderTitle = SortOrder.desc;
        } else {
          this.sortOrderTitle = SortOrder.asc;
        }

    }

    public changeSortOrderDate() {
        let sort = this.currentSortOrderDate = this.sortOrderDate;

        this.mailsAfterSearch.sort(function (mail1, mail2) {
            switch (sort) {
                case SortOrder.asc: default: {
                    if (mail1.date < mail2.date) {
                        return -1;
                    } else if (mail1.date > mail2.date) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
                case SortOrder.desc: {
                    if (mail1.date > mail2.date) {
                        return -1;
                    } else if (mail1.date < mail2.date) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            }

        });
        this.page = 1;
        this.getPartOfMails();

        if(this.sortOrderDate as SortOrder == SortOrder.asc as SortOrder) {
          this.sortOrderDate = SortOrder.desc;
        } else {
          this.sortOrderDate = SortOrder.asc;
        }

    }


    public searchInMails() {
        if (this.searched == "") {
            this.mailsAfterSearch = this.mailsFromServer;
        }
        else {
            this.mailsAfterSearch = [];
            console.log(this.searched);
            for (var i = 0; i < this.mailsFromServer.length; i++) {
                if (this.mailsFromServer[i].title.indexOf(this.searched.toString()) !== -1) {
                    this.mailsAfterSearch.push(this.mailsFromServer[i]);
                }
            }
        }
        this.getPartOfMails();
    }

    public getPartOfMails() {
        this.mailsOnPage = this.mailsAfterSearch.slice((this.page - 1) * this.maxMailsOnPage, this.page * this.maxMailsOnPage);
    }

    public getMailsFromMailbox(mailbox:String) {
      this.loadingMails = true;
      this.mailsService.getMailsFromMailbox(mailbox).subscribe(mails => {
        this.loadingMails = false;
          if (mails) {
            this.mailsFromServer = mails;
          } else {
            this.mailsFromServer = [];
          }
          this.searched = "";
          this.searchInMails();
          //sortowanie po dacie
          this.changeSortOrderDate();
      });
    }
}
