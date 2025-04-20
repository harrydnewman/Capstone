---
license: mit
language:
- en
metrics:
- precision
library_name: transformers
pipeline_tag: image-classification
---

# Acne Severity Detection Model

## Overview

This model card provides documentation for the Acne Severity Detection model checkpoint used in the Hugging Face pipeline. The model is designed to assess acne severity levels, ranging from clear skin to very severe acne.

## Model Details

The checkpoint includes the following files:

- **`config.json`**: Model configuration settings.
- **`model.safetensors`**: Serialized model parameters and architecture.
- **`optimizer.pt`**: Optimizer state capturing the current model optimization.
- **`preprocessor_config.json`**: Configuration file for the preprocessor.
- **`rng_state.pth`**: Random number generator state for reproducibility.
- **`scheduler.pt`**: Scheduler state for controlling learning rate schedules.
- **`trainer_state.json`**: Trainer state with information about the training process.
- **`training_args.bin`**: Binary file storing training arguments.

## Usage

To utilize the model checkpoint, follow these steps:

1. Download this repository.
2. Ensure the required dependencies are installed (`pip install -r requirements.txt`).

## Severity Levels

- **Level -1**: Clear Skin
- **Level 0**: Occasional Spots
- **Level 1**: Mild Acne
- **Level 2**: Moderate Acne
- **Level 3**: Severe Acne
- **Level 4**: Very Severe Acne

## Important Notes

- The model card provides insight into the model's purpose, capabilities, and usage instructions.
- Ensure all necessary files are present in the `checkpoint` directory for proper functionality.

## License

This Acne Severity Detection model checkpoint is licensed under the [MIT License](LICENSE). Please review and adhere to the license when using or modifying the code.