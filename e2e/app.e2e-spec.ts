import { JsonwebtokenKickstartPage } from './app.po';

describe('jsonwebtoken-kickstart App', () => {
  let page: JsonwebtokenKickstartPage;

  beforeEach(() => {
    page = new JsonwebtokenKickstartPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
