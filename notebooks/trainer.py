from flask_ngrok import run_with_ngrok
from flask import Flask, render_template, render_template_string, request, jsonify
import torch
from diffusers import StableDiffusionPipeline, EulerDiscreteScheduler
from transformers import T5Tokenizer, T5ForConditionalGeneration, Trainer, TrainingArguments
from datasets import load_dataset
import base64
from io import BytesIO


# ======== TEXT TRANSFORMER ========
# Load Model
model_name = "google/flan-t5-small"
tokenizer = T5Tokenizer.from_pretrained(model_name)
model = T5ForConditionalGeneration.from_pretrained(model_name)

# Load the product descriptions and ads dataset
dataset = load_dataset('c-s-ale/Product-Descriptions-and-Ads')

# Define a function to process the data
def process_data_to_model_inputs(batch):
    # concatenate product and description columns as input
    inputs = [f'product: {product} description: {description}' for product, description in zip(batch['product'], batch['description'])]
    targets = batch['ad']
    tokenized_inputs = tokenizer(inputs, truncation=True, max_length=512, padding='max_length')
    tokenized_targets = tokenizer(targets, truncation=True, max_length=512, padding='max_length')

    # We need to rename the labels to 'labels' for the T5 model
    tokenized_inputs['labels'] = tokenized_targets['input_ids']

    return tokenized_inputs

# Apply the data processing function to all batches
tokenized_dataset = dataset.map(process_data_to_model_inputs, batched=True)

# Define training arguments
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=1,
    per_device_train_batch_size=8,
    per_device_eval_batch_size=8,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
)

# Create the trainer
trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=tokenized_dataset['train'],
)

# Train the model
trainer.train()
 