export interface Example {
    nav:string;
    copy:string;
    img?:string;
    image?: {
        width:number;
        height:number;
        formats:Array<string>;
    },
    ctas?:{
        link:string;
        copy:string;
    }[]
}

export interface Page {
    id:string;
    link:string;
    name:string;
    examples:Array<Example>
}
