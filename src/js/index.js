class DrawingBoard {
  MODE = "NONE"; // NONE BRUSH ERASER
  IsMouseDown = false; // true false

  constructor() {
    this.assignElement();
    this.initContext();
    this.addEvent();
  }

  assignElement() {
    this.containerEl = document.getElementById("container");
    this.canvasEl = this.containerEl.querySelector("#canvas");
    this.toolbarEl = this.containerEl.querySelector("#toolbar");
    this.brushEl = this.toolbarEl.querySelector("#brush");
    this.colorPickerEl = this.toolbarEl.querySelector("#colorPicker");
    this.brushPanelEl = this.containerEl.querySelector("#brushPanel");
    this.brushSliderEl = this.brushPanelEl.querySelector("#brushSize");
    this.brushSizePreviewEl =
      this.brushPanelEl.querySelector("#brushSizePreview");
  }

  initContext() {
    this.context = this.canvasEl.getContext("2d");
  }

  addEvent() {
    this.brushEl.addEventListener("click", this.onClickBrush.bind(this));
    this.canvasEl.addEventListener("mousedown", this.onMouseDown.bind(this));
    this.canvasEl.addEventListener("mousemove", this.onMouseMove.bind(this));
    this.canvasEl.addEventListener("mouseup", this.onMouseUp.bind(this));
    this.canvasEl.addEventListener("mouseout", this.onMouseOut.bind(this));
    this.brushSliderEl.addEventListener(
      "input",
      this.onChangeBrushSize.bind(this)
    );
    this.colorPickerEl.addEventListener("input", this.onChangeColor.bind(this));
  }

  onChangeColor(event) {
    this.brushSizePreviewEl.style.background = event.target.value;
  }

  onChangeBrushSize(event) {
    this.brushSizePreviewEl.style.width = `${event.target.value}px`;
    this.brushSizePreviewEl.style.height = `${event.target.value}px`;
  }

  onMouseDown(event) {
    if (this.MODE === "NONE") return;
    this.IsMouseDown = true;
    const currentPosition = this.getMousePosition(event);
    this.context.beginPath();
    this.context.moveTo(currentPosition.x, currentPosition.y);
    this.context.lineCap = "round";
    this.context.strokeStyle = this.colorPickerEl.value;
    this.context.lineWidth = this.brushSliderEl.value;
    // this.context.lineTo(400, 400);
    // this.context.stroke();
  }

  onMouseUp() {
    if (this.MODE === "NONE") return;
    this.IsMouseDown = false;
  }

  onMouseOut() {
    if (this.MODE === "NONE") return;
    this.IsMouseDown = false;
  }

  onMouseMove(event) {
    if (!this.IsMouseDown) return;
    const currentPosition = this.getMousePosition(event);
    this.context.lineTo(currentPosition.x, currentPosition.y);
    this.context.stroke();
  }

  getMousePosition(event) {
    const boundaries = this.canvasEl.getBoundingClientRect();
    return {
      x: event.clientX - boundaries.left,
      y: event.clientY - boundaries.top,
    };
  }

  onClickBrush(event) {
    const IsActive = event.currentTarget.classList.contains("active");
    this.MODE = IsActive ? "NONE" : "BRUSH";
    this.canvasEl.style.cursor = IsActive ? "default" : "crosshair";
    this.brushEl.classList.toggle("active");
    this.brushPanelEl.classList.toggle("hide");
  }
}

new DrawingBoard();
