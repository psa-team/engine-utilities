export interface ILexicalAction
{
    (prop: string, value: any, props: string[], values: any[]) : void;
}
export interface ILexicalFilter
{
    (prop: string, value: any, props?: string[], values?: any[]) : boolean;
}
export interface IKeyValuePair
{
    key: string;
    value: string
}

export class LexicalProcessor
{
    constructor(public readonly json: string) { };

    forEach(action: ILexicalAction, filter?: ILexicalFilter): void
    {
        let props: string[] = [];
        let values: string[] = [];
        this.forEachImpl(this.json, props, values, action, filter);
    }
    private forEachImpl(data: string, props: string[], values: any[], action: ILexicalAction, filter?: ILexicalFilter): void
    {
        for (const[prop, value] of Object.entries(data))
        {
            if (prop === '0')
            {
                break;
            }
            if (!filter || filter(prop, value, props, values))
            {
                action(prop, value, props, values);
            }
            props.push(prop);
            values.push(value);
            this.forEachImpl(value, props, values, action, filter);
            props.pop();
            values.pop();
        }
    }

    select(filter: ILexicalFilter, data?: string) : any[]
    {
        let props: string[] = [];
        let values: string[] = [];
        let result: any[] = [];
        this.selectImpl(data ?? this.json, props, values, result, filter);
        return result;
    }
    private selectImpl(data: string, props: string[], values: any[], result: any[], filter: ILexicalFilter) : any[]
    {
        for (const[prop, value] of Object.entries(data))
        {
            if (prop === '0')
            {
                break;
            }
            if (filter(prop, value, props, values))
            {
                result.push(value);
            }
            props.push(prop);
            values.push(value);
            this.selectImpl(value, props, values, result, filter);
            props.pop();
            values.pop();
        }
        return result;
    }

    first(filter: ILexicalFilter, data?: string) : any
    {
        let props: string[] = [];
        let values: string[] = [];
        return this.firstImpl(data ?? this.json, props, values, filter);
    }
    private firstImpl(data: string, props: string[], values: string[], filter: ILexicalFilter) : any
    {
        for (const[prop, value] of Object.entries(data))
        {
            if (prop === '0')
            {
                break;
            }
            if (filter(prop, value, props, values))
            {
                return value;
            }
            props.push(prop);
            values.push(value);
            var result = this.firstImpl(value, props, values, filter);
            if (result)
            {
                return result;
            }
            props.pop();
            values.pop();
        }
        return null;
    }

    layer(data: string, filter?: ILexicalFilter) : IKeyValuePair[]
    {
        let result: IKeyValuePair[] = [];
        for (const[prop, value] of Object.entries(data))
        {
            if (prop === '0') {
                break;
            }
            if (!filter || filter(prop, value)) {
                let pair: IKeyValuePair = {
                    key: prop,
                    value: value
                }
                result.push(pair);
            }
        }
        return result;
    }
}