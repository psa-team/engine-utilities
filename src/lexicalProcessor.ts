export interface LexicalFunction
{
    (prop: string, value: any, props: string[], values: any[]) : boolean;
}

export class LexicalProcessor
{
    constructor(public readonly json: string) { };

    forEach(action: LexicalFunction, filter?: LexicalFunction): void
    {
        let props: string[] = [];
        let values: string[] = [];
        this.forEachImpl(this.json, props, values, action, filter);
    }
    private forEachImpl(data: string, props: string[], values: any[], action: LexicalFunction, filter?: LexicalFunction): void
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
}