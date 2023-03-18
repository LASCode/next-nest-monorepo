import styled from "styled-components";
import Link from "next/link";

const StyledHeader = styled.header`
  background-color: rgba(255,255,255,0.3);
  border-bottom: 1px solid whitesmoke;
`;
const StyledHeaderInner = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  max-width: 1000px;
`;
const StyledNavigation = styled.nav``;
const StyledNavigationItem = styled(Link)``;
const StyledProfileLink = styled(Link)``;

export const Header = () => {
    const routes = [
        {title: "Тест", href: "/test"},
        {title: "Тест1", href: "/test1"},
        {title: "Тест2", href: "/test2"}
    ];

    return (
        <StyledHeader>
            <StyledHeaderInner>
                <StyledNavigation>
                    {routes.map((el) =>
                        <StyledNavigationItem key={el.href} href={el.href}>
                            {el.title}
                        </StyledNavigationItem>
                    )}
                </StyledNavigation>
                <StyledProfileLink href={'/profile'}>
                    Мой профиль
                </StyledProfileLink>
            </StyledHeaderInner>
        </StyledHeader>
    );
};