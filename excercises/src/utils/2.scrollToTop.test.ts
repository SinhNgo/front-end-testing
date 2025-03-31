import { useScrollToTop } from "./2.scrollToTop";
import {vi} from "vitest";

describe("useScrollToTop", () => {
  it("should use default element and options when no arguments are passed", () => {
    document.documentElement.scrollTo = vi.fn();
    const elementSpy = vi.spyOn(document.documentElement, "scrollTo").mockImplementation(() => {});

    const { scrollToTop } = useScrollToTop();
    scrollToTop();

    expect(elementSpy).toHaveBeenCalledTimes(1);
    expect(document.documentElement.scrollTo).toHaveBeenCalledWith({
      behavior: "smooth",
      top: 0,
      left: 0,
    });
  });

  it("should use provided element and default options when only element is passed", () => {
    const element = {
      scrollTo: vi.fn(),
    } as unknown as HTMLElement;

    const { scrollToTop } = useScrollToTop(element);
    scrollToTop();

    expect(element.scrollTo).toHaveBeenCalledWith({
      behavior: "smooth",
      top: 0,
      left: 0,
    });
  });

  it("should use default element and provided options when only options are passed", () => {
    const element = {
      scrollTo: vi.fn(),
    } as unknown as HTMLElement;

    const options = { behavior: "auto" };
    const { scrollToTop } = useScrollToTop(element, options as unknown as ScrollOptions);
    scrollToTop();

    expect(element.scrollTo).toHaveBeenCalledWith({
      behavior: "auto",
      top: 0,
      left: 0,
    });
  });
});
