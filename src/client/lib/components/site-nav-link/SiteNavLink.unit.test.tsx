import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';
import { SiteNavLink, type SiteNavLinkProps } from './SiteNavLink';

const DEFAULT_PROPS: SiteNavLinkProps = {
  to: '/',
};

//  const buildWrappedComponent = (props: OfferPageProps = DEFAULT_PROPS) => (
//     <BrowserRouter>
//       <ReduxProvider store={store}>
//         <HelmetProvider>
//           <OfferPage {...props} />
//         </HelmetProvider>
//       </ReduxProvider>
//     </BrowserRouter>
//   );

const buildWrappedComponent = (props: SiteNavLinkProps = DEFAULT_PROPS) => (
  <BrowserRouter>
    <SiteNavLink {...props} />
  </BrowserRouter>
);

describe('SiteNavLink', () => {
  test('should correspond default layout', () => {
    const result = render(buildWrappedComponent());

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "children" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, children: 'Children' }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, children: 'Children v2' }));

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "className" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, className: 'custom-class' }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, className: 'custom-class-v2' }));

    expect(result.container).toMatchSnapshot();
  });

  test('should support the "to" prop', () => {
    let result = render(buildWrappedComponent({ ...DEFAULT_PROPS, to: '/' }));

    expect(result.container).toMatchSnapshot();

    result = render(buildWrappedComponent({ ...DEFAULT_PROPS, to: '/v2' }));

    expect(result.container).toMatchSnapshot();
  });
});
