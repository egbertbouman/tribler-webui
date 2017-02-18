import { TriblerWebuiPage } from './app.po';

describe('tribler-webui App', () => {
  let page: TriblerWebuiPage;

  beforeEach(() => {
    page = new TriblerWebuiPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
