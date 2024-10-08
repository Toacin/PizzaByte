export default function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  const offset = 140;

  if (element) {
    const elementPosition =
      element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}
