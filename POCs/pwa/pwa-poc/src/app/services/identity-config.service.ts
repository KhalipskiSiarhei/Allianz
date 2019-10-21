import { Injectable } from '@angular/core';

@Injectable()
export class IdentityConfigService {
    private vendorSrc: string;
    private countrySrc: string;
    private policyIdSrc: string;
    private initSrc: boolean;

    constructor() {
    }

    public get vendor(): string {
        this.ensureInitSuccessed();
        return this.vendorSrc;
    }

    public get country(): string {
        this.ensureInitSuccessed();
        return this.countrySrc;
    }

    public get policyId(): string {
        this.ensureInitSuccessed();
        return this.policyIdSrc;
    }

    public get baseHref(): string {
        this.ensureInitSuccessed();
        return '/' + this.vendor + '/' + this.country + '/' + this.policyIdSrc + '/';
    }

    public init(document: Document) {
        const paths: string[] = document.location.pathname.split('/').filter(p => p);

        if (paths.length >= 3) {
          this.vendorSrc = paths[0];
          this.countrySrc = paths[1];
          this.policyIdSrc = paths[2];
          this.initSrc = true;
        } else {
            throw new Error('IdentityConfisService cant be initialized with the current path=' + document.location.pathname);
        }
    }

    private ensureInitSuccessed() {
        if (!this.initSrc) {
            throw new Error('IdentityConfirService was not initialized...');
        }
    }
}
