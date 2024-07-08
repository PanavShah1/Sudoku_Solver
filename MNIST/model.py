from torch import nn
class MNISTModelV0(nn.Module):
  def __init__(self, input_shape, hidden_layers, output_shape):
    super().__init__()
    self.layer_stack_1 = nn.Sequential(
        nn.Conv2d(in_channels=input_shape,
                  out_channels=hidden_layers,
                  kernel_size=3,
                  stride=1,
                  padding=1),
        nn.ReLU(),
        nn.Conv2d(in_channels=hidden_layers,
                  out_channels=hidden_layers,
                  kernel_size=3,
                  stride=1,
                  padding=1),
        nn.ReLU(),
        nn.MaxPool2d(kernel_size=2)
    )
    self.layer_stack_2 = nn.Sequential(
        nn.Conv2d(in_channels=hidden_layers,
                  out_channels=hidden_layers,
                  kernel_size=3,
                  stride=1,
                  padding=1),
        nn.ReLU(),
        nn.Conv2d(in_channels=hidden_layers,
                  out_channels=hidden_layers,
                  kernel_size=3,
                  stride=1,
                  padding=1),
        nn.ReLU(),
        nn.MaxPool2d(kernel_size=2)
    )
    self.layer_stack_3 = nn.Sequential(
        nn.Flatten(),
        nn.Linear(in_features=hidden_layers*7*7,
                  out_features=output_shape)
    )

  def forward(self, x):
    x = self.layer_stack_1(x)
    # print(x.shape)
    x = self.layer_stack_2(x)
    # print(x.shape)
    x = self.layer_stack_3(x)
    # print(x.shape)
    return x