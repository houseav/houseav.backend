export class CurrentAnalytics {
  task_executions: {
    total: number;
    failed: number;
    complete: number;
  };
  tasks: {
    total: number;
  };
  owners: {
    total: number;
    complete: number;
    incomplete: number;
  };
  properties: {
    total: number;
    fabbricati: number;
    terreni: number;
  };
}
